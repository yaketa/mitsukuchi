import simpleGit from 'simple-git';

const git = simpleGit();

const pushToGithub = async () => {
  try {
    // 変更をステージング
    await git.add('.');
    
    // コミットメッセージの入力（実際の実装では、ユーザーに入力を求めるなどの処理が必要）
    const commitMessage = 'Update from bolt.new';
    await git.commit(commitMessage);
    
    // GitHubにプッシュ（ブランチ名は適宜変更してください）
    await git.push('origin', 'main');
    
    console.log('Successfully pushed changes to GitHub');
  } catch (error) {
    console.error('Error pushing to GitHub:', error);
  }
};

pushToGithub();