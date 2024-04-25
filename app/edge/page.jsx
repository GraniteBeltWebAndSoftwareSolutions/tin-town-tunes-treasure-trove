import Link from 'next/link';
import { Alert } from '../../components/alert';
import { Markdown } from 'components/markdown';

export const metadata = {
    title: 'Fallback'
};

const explainer = `

Once upon a time, in a world where technology knew 

no bounds, there was an incredible invention called 

DreamNet. DreamNet was an interface that allowed people 

to explore a whole new realm of possibilities by being 

online in their dreams.

Imagine this, my friend: you could connect to DreamNet 

before going to sleep, and as you drifted off into 

dreamland, you would find yourself in a virtual world 

of your own creation. It was like stepping into a 

lucid dream, where you had complete control over your 

surroundings and experiences.

With DreamNet, people could visit fantastical landscapes, 

meet friends from across the globe, and even interact with 

their favorite fictional characters. The possibilities were endless, limited only by the boundaries of one's imagination.

The interface was sleek and intuitive, offering a seamless transition between the waking world and the dream world. Users could customize their avatars, choosing from a vast array of appearances and abilities. Whether you wanted to be a superhero soaring through the skies or a mystical creature exploring enchanted forests, DreamNet had it all.

DreamNet also had a social aspect, allowing users to connect with others in their dreams. You could gather with friends in virtual cafes, attend dream concerts, or even participate in epic dream battles. It was a world where friendships were forged and memories were made, all within the realm of dreams.

But DreamNet wasn't just about fun and entertainment. It also had practical applications. Artists could create masterpieces in their dreams, architects could design breathtaking structures, and scientists could conduct groundbreaking experiments. The dream world became a canvas for innovation and exploration.

As DreamNet gained popularity, people began to realize the profound impact it had on their waking lives. Dreams became a source of inspiration, a place where ideas flourished and creativity thrived. The lines between the real world and the dream world blurred, as people discovered new depths within themselves.

However, with great power comes great responsibility. DreamNet had its challenges as well. Users had to navigate the realm of dreams carefully, as their deepest fears and desires could manifest unexpectedly. It required self-awareness and the ability to distinguish between dreams and reality.

But despite the challenges, DreamNet brought a sense of wonder and excitement to people's lives. It allowed them to explore the uncharted territories of their own minds and connect with others on a profound level.

And so, the story of DreamNet continues, as more and more people embrace the interface and unlock the limitless potential of their dreams. It's a world where the boundaries between reality and imagination fade away, and







-+-++ Gobledegook -+-+- 
This page is using a [Netlify Edge Function](https://docs.netlify.com/edge-functions/overview/) to rewrite the URL based on visitor geography.

For it to be invoked, please either run this site locally with \`netlify dev\` or deploy it to Netlify.

Edge Functions are framework-agnostic, but are also used behind the scenes to run Next.js Middleware on Netlify.
There are advatanges to using Edge Functions directly, such as the ability to access & transform the response body.

[See more examples](https://edge-functions-examples.netlify.app)
`

export default function FallbackPage() {
    return (
        <>
            <h1>You&apos;ve reached the fallback page.</h1>
            <Markdown content={explainer} />
        </>
    );
}
