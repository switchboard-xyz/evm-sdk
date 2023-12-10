-include .env

.PHONY: build clean publish test

# Variables
CARGO_NAME=evm-randomness-function
DOCKER_IMAGE_NAME=switchboardlabs/evm-randomness-function

DOCKER_BUILD_COMMAND=DOCKER_BUILDKIT=1 docker buildx build --platform linux/amd64 --build-arg CARGO_NAME=${CARGO_NAME}

# Default make task
all: build

solc            :; nix-env -f https://github.com/dapphub/dapptools/archive/master.tar.gz -iA solc-static-versions.solc_0_8_19

build_contract:
	forge build --optimize

docker_build:
	${DOCKER_BUILD_COMMAND} --pull -f Dockerfile -t ${DOCKER_IMAGE_NAME} --load ./
docker_publish:
	${DOCKER_BUILD_COMMAND} --pull -f Dockerfile -t ${DOCKER_IMAGE_NAME} --push ./

dev_docker_build:
	${DOCKER_BUILD_COMMAND} --pull -f Dockerfile.dev -t ${DOCKER_IMAGE_NAME} --load ../../../../../
dev_docker_publish:
	${DOCKER_BUILD_COMMAND} --pull -f Dockerfile.dev -t ${DOCKER_IMAGE_NAME} --push ../../../../../

build: build_contract docker_build measurement

dev: dev_docker_build measurement

publish: docker_publish measurement

measurement:
	@docker run -d --platform=linux/amd64 -q --name=my-switchboard-function ${DOCKER_IMAGE_NAME}:latest > /dev/null
	@docker cp my-switchboard-function:/measurement.txt measurement.txt
	@echo -n 'MrEnclve: '
	@cat measurement.txt
	@docker stop my-switchboard-function > /dev/null
	@docker rm my-switchboard-function > /dev/null

# Task to clean up the compiled rust application
clean:
	cargo clean
