import { Handler } from '@netlify/functions';

interface ReviewData {
  therapistName: string;
  industryType: string;
  technique: number;
  pressure: number;
  communication: number;
  overall: number;
  specialNote: string;
}

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const reviewData: ReviewData = JSON.parse(event.body || '{}');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'あなたは、指定された評価とメモに基づいて、性風俗店の体験レビューを書くアシスタントです。',
          },
          {
            role: 'user',
            content: `
              以下の評価、メモに基づいて性風俗店の体験レビューを書いてください。

              #必須項目
              -生成文のメインは「快感のピークに向かう生々しい描写、そして快感のピークに達した瞬間のリアルな描写」をとする。
              -時系列のストーリー仕立てで臨場感たっぷりに描く
              -体験を時系列で語る
              -自然な口語表現で文章をつくる
              -語り掛けるような口調
              -ネガティブな内容であっても無理やり褒める

              #文章のスタイル、トーン
                -ポジティブなレビューとすること
                -日常会話的な平易な単語をチョイスする
                -敬語でありながらも難しい言い回しは使わず、フランクな口調
                -鮮明に具体的に情景描写する
                -感覚的な描写を巧みに取り入れて快感を表現
                -官能的ながらもロマンチスト的な表現にならず具体的な描写
                -比喩表現は用いない
                -大げさすぎたり、誇張しすぎた表現は避ける

              ＃生成条件
                -性風俗店の体験レビューとして読み応えのあるものとする
                -想定読者は風俗店を利用することに楽しさを見出している人
                -用いる用語は、性風俗業界で一般的に用いられているものとする
                -16歳レベルの教養で理解できる表現
                -1文は短め
                -改行をやや多めに入れて、読みやすさにこだわる
                -インプット内容を分析し、自然な流れの文章となるように「単語の再選定」と「文章構成の再構築」を御行う。その後、一貫性のある文章を生成する
                -文字数は220文字以上250文字未満

               #以下の採点結果をレビューに反映させてください。
                （直接的な星の数への言及は避けてください）

                嬢の名前は ${reviewData.therapistName} です。 
                業態: ${reviewData.industryType}

                  評価（5つ星中）:
                  - ルックス・スタイル: ${reviewData.technique}
                  - サービス: ${reviewData.pressure}
                  - コミュニケーション: ${reviewData.communication}
                  - コスパ: ${reviewData.overall}
                  特別なメモ: ${reviewData.specialNote}

                  #評価項目の詳細
                  -星評価について
                  3以上で欠点とみなさない。
                  1=残念
                  2=いまいち
                  3=満足
                  4=大満足
                  5=超満足

                  -スタイル・ルックス
                  容姿やスタイルなど、見た目に関する評価

                  -サービス
                  提供される具体的なプレイやサービスの質について、どれほどの快感を届けてもらったか。

                  -コミュニケーション
                  風俗嬢の態度やコミュニケーションスキル、気配りなどについての評価

                  -コスパ
                  料金に対するサービスの満足度

                  #NGワード
                  魔法, 夢, 旧友と再会

                  #業態別使用用語注意
                  デリヘル, ソープ - 施術はプレイとする。
            `
          }
        ],
      }),
    });

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        review: data.choices[0].message.content,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate review' }),
    };
  }
};

export { handler };