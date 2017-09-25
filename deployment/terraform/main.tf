terraform {
  backend "s3" {
    bucket = "rahpey-test"
    key    = "terraform/state"
    region = "eu-west-1"
  }
}

provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_key_pair" "auth" {
  key_name   = "${var.key_name}"
  public_key = "${file(var.public_key_path)}"
}

resource "aws_vpc" "default" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
}

resource "aws_internet_gateway" "default" {
  vpc_id = "${aws_vpc.default.id}"
}

resource "aws_route" "internet_access" {
  route_table_id         = "${aws_vpc.default.main_route_table_id}"
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = "${aws_internet_gateway.default.id}"
}

resource "aws_subnet" "default" {
  vpc_id                  = "${aws_vpc.default.id}"
  cidr_block              = "10.0.0.0/24"
  map_public_ip_on_launch = true
}

resource "aws_security_group" "default" {
  name        = "rahpey-test-default-security-group"
  description = "Default Security Group"
  vpc_id      = "${aws_vpc.default.id}"

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # # HTTP
  # ingress {
  #   from_port   = 80
  #   to_port     = 80
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }


  # # HTTPS
  # ingress {
  #   from_port   = 443
  #   to_port     = 443
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }


  # # Kibana
  # ingress {
  #   from_port   = 5601
  #   to_port     = 5601
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }


  # # Zipkin
  # ingress {
  #   from_port   = 9411
  #   to_port     = 9411
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "rahpey_server" {
  connection {
    user        = "ubuntu"
    type        = "ssh"
    timeout     = "30m"
    agent       = false
    private_key = "${file(var.private_key_path)}"
  }

  provisioner "file" {
    source      = "/tmp/rahpey.tar.gz"
    destination = "/home/ubuntu/rahpey.tar.gz"
  }

  provisioner "file" {
    source      = "rahpey.sh"
    destination = "/tmp/rahpey.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "cd /home/ubuntu",
      "mkdir src",
      "tar xvf rahpey.tar.gz -C /home/ubuntu/src | tee /tmp/tar.log",
      "chmod a+x /tmp/rahpey.sh",
      "/tmp/rahpey.sh",
    ]
  }

  instance_type          = "${var.aws_instance_type}"
  ami                    = "${lookup(var.aws_amis, var.aws_region)}"
  key_name               = "${aws_key_pair.auth.id}"
  vpc_security_group_ids = ["${aws_security_group.default.id}"]
  subnet_id              = "${aws_subnet.default.id}"

  root_block_device {
    volume_type = "standard"
    volume_size = "32"
  }
}
