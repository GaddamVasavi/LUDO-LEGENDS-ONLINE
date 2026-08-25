#!/bin/bash
echo "=== PREPARING GIT REPOSITORY FOR MEASURE.PY ==="
python setup_git.py || bash setup_git.sh

echo "=== RUNNING MEASURE.PY CHECKLIST ==="
python /home/runner/workspace/measure-ext/measure.py "$@"
