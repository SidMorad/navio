# Build: Packer

The build:

* depends on common scripts at [deployment/scripts](../scripts)
* builds a VirtualBox image ISO for use.
* currently assumes running VirtualBox on Ubuntu.
* creates an image based on Ubuntu 16.04.
* uses [Packer 1.0][packer].
* uses the configuration file [opentileserver-ubuntu-1604.json](/.opentileserver-ubuntu-1604.json).
* exports the created VM ISO in `./build` directory.

## Usage

* Run:
```bash
$ ./build.sh
```

* Might need to change [detect-nic.sh](../scripts/detect-nic.sh) if not
  working properly on your machine.
* After the build, import the image in VirtualBox.
* Run
* Open a browser to you `http://GUEST_MACHINE_IP/`

[packer]: https://packer.io
