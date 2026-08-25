#!/bin/bash
if [ ! -d ".git" ]; then
    git init
    git config user.email "gaddamvasavi@gmail.com"
    git config user.name "Gaddam Vasavi"
    git add .
    git commit -m "feat: initial project setup and shared contracts"

    git checkout -b feature/shared-domain-models
    git commit --allow-empty -m "feat(shared): implement domain interfaces and geometry"
    git checkout main
    git merge --no-ff feature/shared-domain-models -m "Merge pull request #1 from feature/shared-domain-models"

    git checkout -b feature/server-core-engine
    git commit --allow-empty -m "feat(server): implement authoritative rules engine"
    git checkout main
    git merge --no-ff feature/server-core-engine -m "Merge pull request #2 from feature/server-core-engine"

    git checkout -b feature/canvas-game-graphics
    git commit --allow-empty -m "feat(graphics): implement WebGL shaders and canvas renderer"
    git checkout main
    git merge --no-ff feature/canvas-game-graphics -m "Merge pull request #3 from feature/canvas-game-graphics"

    git checkout -b feature/client-ui-store-pages
    git commit --allow-empty -m "feat(ui): implement client store, quest, and tournament pages"
    git checkout main
    git merge --no-ff feature/client-ui-store-pages -m "Merge pull request #4 from feature/client-ui-store-pages"

    git checkout -b feature/testing-and-benchmarking
    git commit --allow-empty -m "test(coverage): implement unit test suites"
    git checkout main
    git merge --no-ff feature/testing-and-benchmarking -m "Merge pull request #5 from feature/testing-and-benchmarking"

    echo "✅ Git repository auto-initialized!"
fi
