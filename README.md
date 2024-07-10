
# git

```bash
git tag  # 查看本地标签
git ls-remote --tags  # 查看远程标签

git tag -l | xargs git tag -d  # 删除本地所有标签
git fetch --prune  # 从远程获取最新标签信息并删除本地不存在的远程标签

git push origin --tags  # 推送本地所有标签到远程

git push origin [tag_name] # 推送指定标签

git push origin :refs/tags/[tag_name]  # 删除远程指定标签
```