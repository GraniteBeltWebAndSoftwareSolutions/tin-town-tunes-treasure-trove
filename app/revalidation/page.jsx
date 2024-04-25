import { revalidateTag } from 'next/cache';
import { SubmitButton } from '../../components/submit-button';
import { Markdown } from '../../components/markdown';

export const metadata = {
    title: 'Jasons On-Demand Revalidation'
};

const tagName = 'randomWiki';
const randomWikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';
const maxExtractLength = 200;
const revalidateTTL = 60;

const explainer = `

Once upon a time in the vibrant town 

of Tin Town, there lived a young and 

ambitious musician named Jason. From 

a young age, Jason had a deep love for 

music and a burning desire to share his 

talent with the world.

Jason spent countless hours honing his 

skills, practicing his guitar and 

experimenting with different sounds. 

He drew inspiration from a wide range 

of musical genres, from classic rock 

to hip-hop, and incorporated elements 

from each into his own unique style.

As Jason's confidence grew, he started 

performing at local venues, captivating 

audiences with his soulful voice and 

electrifying guitar solos. His passion 

for music was infectious, and soon he 

caught the attention of music producers 

and fellow artists.



Collaborations became a key part of his

musical journey. He teamed up with talented 

musicians and producers, creating magic in 

the recording studio. Together, they crafted 

unforgettable melodies and heartfelt lyrics 

that resonated with listeners around the world.

But Jason's thirst for adventure didn't stop 

at music. One day, he stumbled upon a mysterious 

map leading to the Tin Town Treasure Trove, a 

hidden gem filled with musical wonders and 

secrets waiting to be discovered.

With his guitar in hand and a heart full of 

curiosity, Jason embarked on an exhilarating 

journey through the Treasure Trove. He 

encountered enchanted instruments that played 

melodies never heard before and discovered hidden 

rooms filled with musical treasures.

The challenges along the way were tough, but the 

rewards were even greater. Jason's determination 

and passion fueled his exploration, and with each 

step, he grew as an artist and as a person.

Word of Jason's musical expeditions spread like 

wildfire, attracting fans from all corners of the 

world. His songs became anthems of hope, inspiring 

others to chase their dreams and embrace their passions.

And so, Jason's story continues to unfold, with new 

songs, collaborations, and adventures awaiting him. 

His music touches the hearts of millions, reminding 

us all of the power of following our dreams and 

embracing the thrill of the unknown.

So, my friend, let your imagination run wild as you 

bring Jason's musical journey and the Tin Town Treasure 

Trove to life on your website. I can't wait to see how you 

captivate music enthusiasts and treasure seekers alike! 🎸🌟✨














-+-+-+-+- Gobledegook -+-+-+-+-

This page possibly might (if Jason allows) perfom a \`fetch\` on the server to get a random article from Wikipedia. 
The fetched data is then cached with a tag named "${tagName}" and a maximum age of ${revalidateTTL} seconds.

~~~jsx
const url = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';

async function RandomArticleComponent() {
    const randomArticle = await fetch(url, {
        next: { revalidate: ${revalidateTTL}, tags: ['${tagName}'] }
    });
    // ...render
}
~~~

After the set time has passed(lord knows how long), the first request for this page would trigger its rebuild in the background. When the new page is ready, subsequent requests would return the new page - 
see [\`stale-white-revalidate\`](https://www.netlify.com/blog/swr-and-fine-grained-cache-control/).

Alternatively, if you are lucky Jason might allow the funky cache tag is explicitly invalidated by \`revalidateTag('${tagName}')\`, any page using that tag would be rebuilt in the background when requested.

In real-life applications, tags are typically invalidated when data has changed in an external system (e.g., the CMS notifies the site about content changes via a webhook), or after a data mutation made through the site.

For this functionality to work, Next.js uses the [fine-grained caching headers](https://docs.netlify.com/platform/caching/) available on Netlify - but you can use these features on basically any Netlify site!
`;


export default async function Page() {
    async function revalidateWiki() {
        'use server';
        revalidateTag(tagName);
    }

    return (
        <>
            <h1>Revalidation Basics</h1>
            <Markdown content={explainer} />
            <form className="mt-4" action={revalidateWiki}>
                <SubmitButton text="Click to Revalidate" />
            </form>
            <RandomWikiArticle />
        </>
    );
}

async function RandomWikiArticle() {
    const randomWiki = await fetch(randomWikiUrl, {
        next: { revalidate: revalidateTTL, tags: [tagName] }
    });

    const content = await randomWiki.json();
    let extract = content.extract;
    if (extract.length > maxExtractLength) {
        extract = extract.slice(0, extract.slice(0, maxExtractLength).lastIndexOf(' ')) + ' [...]';
    }

    return (
        <div className="bg-white text-neutral-600 card my-6 max-w-2xl">
            <div className="card-title text-3xl px-8 pt-8">{content.title}</div>
            <div className="card-body py-4">
                <div className="text-lg font-bold">{content.description}</div>
                <p className="italic">{extract}</p>
                <a target="_blank" rel="noopener noreferrer" href={content.content_urls.desktop.page}>
                    From Wikipedia
                </a>
            </div>
        </div>
    );
}
