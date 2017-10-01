variable "private_key_path" {
  description = <<DESCRIPTION
Path to the SSH private key to be used for authentication into AWS EC2 Instance.
Expose this to terraform using environment variable: `TF_VAR_private_key_path`
DESCRIPTION
}

variable "public_key_path" {
  description = <<DESCRIPTION
Path to the SSH public key to be used for authentication.
Ensure this keypair is added to your local SSH agent so provisioners can
connect.
Example: ~/.ssh/terraform.pub
DESCRIPTION

  default = "./key.pub"
}

variable "key_name" {
  description = "Desired name of AWS key pair that is generated"
  default     = "rahpey-test"
}

variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "eu-west-1"
}

variable "aws_amis" {
  default = {
    #eu-west-1 = "ami-c32bc5ba"
    eu-west-1 = "ami-1446b66d"
  }
}

variable "aws_instance_type" {
  default = "c3.xlarge"
}
