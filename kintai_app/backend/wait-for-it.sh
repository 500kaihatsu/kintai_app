#!/usr/bin/env bash
# wait-for-it.sh
# Usage: wait-for-it.sh host:port [-t timeout]

set -e

host="$1"
port="$2"
timeout=15

while ! nc -z "$host" "$port"; do
  >&2 echo "Waiting for $host:$port..."
  sleep 1
  timeout=$((timeout - 1))
  if [ $timeout -le 0 ]; then
    >&2 echo "Timeout waiting for $host:$port"
    exit 1
  fi
done

>&2 echo "$host:$port is available"
exec "${@:3}"

