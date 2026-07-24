import prisma from 'lib/prisma'
import { getUserTweets } from 'lib/data.js'
import Tweets from 'components/Tweets'
import PageContainer from 'components/PageContainer'
import ProfileHeader from 'components/ProfileHeader'

export default function UserProfile({ name, tweets }) {
  return (
    <PageContainer title={name}>
      <ProfileHeader
        name={name}
        image={tweets[0]?.author.image}
        tweetCount={tweets.length}
      />
      <Tweets tweets={tweets} />
    </PageContainer>
  )
}


export async function getServerSideProps({ params }) {
  let tweets = await getUserTweets(params.name, prisma)
  tweets = JSON.parse(JSON.stringify(tweets))

  return {
    props: {
      name: params.name,
      tweets,
    },
  }
}