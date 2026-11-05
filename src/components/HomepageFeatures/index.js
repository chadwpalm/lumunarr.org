import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Mermaid from "@theme/Mermaid";
import ThemedImage from "@theme/ThemedImage"; // ← Add this
import useBaseUrl from "@docusaurus/useBaseUrl";

const FeatureList = [
  {
    title: "A Profile for Every Room",
    description: (
      <>
        Create a separate profile for each Plex player in your home, then narrow it down to specific users, media types
        or libraries. Profiles can follow a schedule, including sunrise and sunset, and only change the lights when the
        room's lights are already on..
      </>
    ),
  },
  {
    title: "Lights That Follow Playback",
    image: null, // No image here – using Mermaid instead
    description: (
      <>
        <div style={{ marginBottom: "1rem" }}>
          Lumunarr listens to Plex webhooks and turns every play, pause, resume, stop and scrobble into a Hue lighting
          change. Dim the room when the movie starts, bring the lights up when you pause, and put everything back the
          way it was when you're done.
          <br />
          <br />
          See the <a href="/docs/Introduction">Introduction</a> for details on how this works.
        </div>
      </>
    ),
  },
  {
    title: "Server Alerts",
    description: (
      <>
        Let a light tell you what's happening on your Plex server. Have it turn on or blink when someone starts
        streaming or when new media is added, and then return to how it was before.
      </>
    ),
  },
];

function Feature({ imageLight, imageDark, title, description }) {
  const lightSrc = useBaseUrl(imageLight);
  const darkSrc = useBaseUrl(imageDark);

  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        {imageLight && imageDark ? (
          <ThemedImage
            alt={`${title} screenshot`}
            sources={{
              light: lightSrc,
              dark: darkSrc,
            }}
            className={styles.featureImage}
            width={300}
            height={200}
          />
        ) : (
          // Mermaid or placeholder
          <div className={styles.featurePlaceholder} />
        )}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
