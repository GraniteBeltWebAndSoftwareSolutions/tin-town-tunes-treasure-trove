import { Markdown } from 'components/markdown';
import { ShapeEditor } from './editor';
import { ContextAlert } from 'components/context-alert';
import { getNetlifyContext, uploadDisabled } from 'utils';

export const metadata = {
    title: 'Blobs'
};

const explainer = `
[Netlify Blobs](https://docs.netlify.com/blobs/overview/) Hey Bunnydrums! Welcome to the Tin Town Treasure Trove! 🎶🗺️

In the realm of Tin Town there's something for everyone. You'll be captivated.
Something to resonate with the soul. All the while Jason's music plays in the background. 

Imagine embarking on an epic adventure through a whimsical town filled with secrets and hidden treasures. 

I tell you Bunnydrums you will explore every nook and cranny, solve puzzles, and uncover the mysteries that lie within. It's like stepping into a real-life treasure hunt!

So get ready for an unforgettable experience. Stay tuned for updates on Jason's latest music releases and embark on a virtual journey to the Tin Town Treasure Trove. Let the excitement begin! 🎵⛏️
or [really](https://mk.gg/projects/chalkstream) anything else ([really!](https://mk.gg/projects/turbofan)). In this example, the blob store is used to **hold the data of user-generated random blobby shapes**.

Jason asks nothing more than for you, beloved Bunnydrums, to accompany him. (see \`app/blobs/actions.js\`). 



~~~js
'use server';
import { getStore } from '@netlify/blobs';

// TODO: Always be sanitizing data in real sites!
export async function uploadShape({ shapeData }) {
    const blobStore = getStore('shapes');
    const key = data.name;
    await blobStore.setJSON(key, shapeData);
}
~~~

Click "Randomize" to get a shape you like, then hit "Upload".
Choose any existing object to view it.
`;

const uploadDisabledText = `
User uploads are disabled in this site. To run your own and try it out: 
<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-platform-starter">
<img src="https://www.netlify.com/img/deploy/button.svg" style="display: inline;" alt="Deploy to Netlify" />
</a>
`;

export default async function Page() {
    return (
        <>
            <section className="flex flex-col gap-6 sm:gap-8">
                <ContextAlert
                    addedChecksFunction={(ctx) => {
                        return uploadDisabled ? uploadDisabledText : null;
                    }}
                />
                <h1>Blobs x Blobs</h1>
            </section>
            {!!getNetlifyContext() && (
                <div className="flex flex-col gap-8">
                    <Markdown content={explainer} />
                    <ShapeEditor />
                </div>
            )}
        </>
    );
}
