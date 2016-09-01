
Git workflow

- Each team member works on their own cloned down version of the fork of the original master repo. 
- Each team member actively works and commits on a local branch of their clone, that represents a feature.
- Once a feature (a branch) is ready, each team member pushes it to the github repo where it will wait for code review. 
- Another team member (or both) reviews each partners feature branch before merging onto the master branch of the git repo.
- Whenever a new branch passes code review and is merged onto the master repo, everyone should 'git pull upstream master' 
onto their local repo so that they have the most updated code (and lower the risk for future merge conflicts).
