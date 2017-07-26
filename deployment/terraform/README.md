# Deployment -- Terraform

:warning: Please do **not** leave instances running as they are costly.

## Launch

* Change directory to here:

```bash
$ cd deployment/terraform
```

* Let your AWS keys be in a file `/path/to/aws-key` as:
```
AWS_ACCESS_KEY=xxx
AWS_SECRET_KEY=zzz
```

* Source the above key file:
```bash
source /path/to/aws-key
```

* Ask for our common *private* key file and export it as:
```bash
$ export TF_PRIVATE_KEY_PATH=/path/to/common-private-rahpey.pem
```

* Run terraform:
```bash
$ ./build.sh
```

## Destroy

To destroy the launched instance:

```bash
$ TF_VAR_private_key_path=$TF_PRIVATE_KEY_PATH terraform destroy
```

## SSH

To SSH to the launched instance:

```bash
$ ./private-key-to-public.sh $TF_PRIVATE_KEY_PATH
$ ssh -i ./key.pub ubuntu@EC2_INSTANCE_IP
```

