<template>
  <div class="about-me">
    <aside>
      <div class="tab">
        <img v-for="icon in icons" :key="icon.iconAlt" :src="icon.iconSrc" :alt="icon.iconAlt" />
      </div>
      <div class="lists">
        <FoldableTab @toggle="toggleHobbies">
          <p>personal_info</p>
        </FoldableTab>
        <div class="hobbies-bar" :class="{ hidden: isHobbiesHidden }">
          <p v-for="(hobby, index) in hobbiesObj" :key="index">
            <img :src="hobby.icon" :alt="hobby.iconAlt" />
            {{ hobby.title }}
          </p>
        </div>
        <FoldableTab @toggle="toggleContact">
          <p>contacts</p>
        </FoldableTab>
        <div class="personal-contact" :class="{ hidden: isContactHidden }">
          <p @click="copyToClipboard(0)">
            {{ contInfo[0] }}
            <i v-if="showIcon[0]" class="fa-solid fa-copy"></i>
          </p>
          <p @click="copyToClipboard(1)">
            {{ contInfo[1] }}
            <i v-if="showIcon[1]" class="fa-solid fa-copy"></i>
          </p>
        </div>
      </div>
    </aside>
    <main class="split-in-half">
      <div class="personal-bio">
        <p>
          {{ bio }}
        </p>
      </div>

      <div class="code-snippet">
        <pre>
          <code ref="codeBlock" class="javascript">
const pigIt = (str) => {
  return str.split(' ').map(e => {
    return e.length > 0 && !e.match(/[!?@#$%^&*]/) 
      ? e.substring(1) + e.slice(0, 1) + 'ay' 
      : e;
  }).join(' ');
};
          </code>
        </pre>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.about-me {
  @include mainMiddleSettings;
  @media (max-width: 768px) {
    @include phone-borders;
  }
  aside {
    width: 300px;
    display: inline-flex;
    .tab {
      position: absolute;
      display: inline-flex;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      width: 60px;
      border-right: 1px solid $lines;
      @media (max-width: 768px) {
        display: none;
      }
      img {
        margin: 10px;
        cursor: pointer;
        &:hover {
          filter: brightness(4);
          opacity: 0.9;
        }
      }
    }
    .lists {
      left: 60px;
      width: 240px;
      position: relative;
      display: inline-block;
      @media (max-width: 768px) {
        left: 0;
      }
      .hobbies-bar {
        margin-left: 20px;
        &.hidden {
          display: none;
        }
      }
    }
  }

  .personal-contact {
    position: relative;
    margin-left: 15px;

    &.hidden {
      display: none;
    }

    p {
      margin: 10px;
      cursor: pointer;
      width: fit-content;

      &::before {
        margin-right: 10px;
        font-family: "Font Awesome 5 pro";
        display: inline-block;
      }

      &:first-of-type::before {
        content: "\f0e0";
      }

      &:last-of-type::before {
        content: "\f095";
        transform: rotate(90deg);
      }

      &:hover {
        color: $secondary4;
        cursor: pointer;
      }
    }
  }
  .split-in-half {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 300px);
    // left: 300px;
    position: relative;
    > * {
      width: calc(50% - 20px);
      padding: 0 20px;
    }
    .code-snippet {
      background-color: #2d2d2d;
      color: #ccc;
      padding: 15px;
      border-radius: 8px;
      font-family: "Fira Code", "Courier", monospace;
      overflow-x: auto;
      max-height: 400px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

      pre {
        margin: 0;
        white-space: pre-wrap;
        word-wrap: break-word;
      }

      code {
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { Clipboard } from "@capacitor/clipboard";
import FoldableTab from "@/components/FoldableTab.vue";
import hljs from "highlight.js"; // Import highlight.js
import "highlight.js/styles/github-dark.css"; // You can change the theme here
const codeBlock = ref<HTMLElement | null>(null);

onMounted(() => {
  // Apply syntax highlighting to the code block after the component is mounted
  if (codeBlock.value) {
    hljs.highlightElement(codeBlock.value);
  }
});

const isHobbiesHidden = ref<boolean>(false);
const isContactHidden = ref<boolean>(false);

const toggleHobbies = (): void => {
  isHobbiesHidden.value = !isHobbiesHidden.value;
};
const toggleContact = (): void => {
  isContactHidden.value = !isContactHidden.value;
};

// Define contact info array of strings
const contInfo: string[] = ["www.bader.com9@gmail.com", "+970595744368"];
const showIcon = ref<boolean[]>([false, false]);

// Define the type for hobbies object array
interface Hobby {
  title: string;
  icon: string;
  iconAlt: string;
}

function getImageUrl(urlPath: string = "../assets/imgs/", name: string): string {
  return new URL(`${urlPath}${name}`, import.meta.url).href;
}

const hobbiesObj: Hobby[] = [
  { title: "bio", icon: getImageUrl("../assets/imgs/svgs/", "red-dir.svg"), iconAlt: "red folder" },
  {
    title: "interests",
    icon: getImageUrl("../assets/imgs/svgs/", "green-dir.svg"),
    iconAlt: "green folder"
  },
  {
    title: "education",
    icon: getImageUrl("../assets/imgs/svgs/", "purple-dir.svg"),
    iconAlt: "purple folder"
  },
  //! make these as children to education!
  {
    title: "high-school",
    icon: getImageUrl("../assets/imgs/svgs/", "md-icon.svg"),
    iconAlt: "markdown icon"
  },
  {
    title: "University",
    icon: getImageUrl("../assets/imgs/svgs/", "md-icon.svg"),
    iconAlt: "markdown icon"
  }
];

// Function to copy to clipboard with typed parameter and async handling
const copyToClipboard = async (index: number): Promise<void> => {
  await Clipboard.write({
    string: contInfo[index]
  });

  // Update the icon display for a short duration
  showIcon.value = showIcon.value.map((value, i) => (i === index ? true : value));

  setTimeout(() => {
    showIcon.value = showIcon.value.map((value, i) => (i === index ? false : value));
  }, 1000);
};

const icons = ref([
  { iconSrc: getImageUrl("../assets/imgs/svgs/", "shell.svg"), iconAlt: "shell" },
  { iconSrc: getImageUrl("../assets/imgs/svgs/", "circle.svg"), iconAlt: "circle" },
  { iconSrc: getImageUrl("../assets/imgs/svgs/", "game.svg"), iconAlt: "game" }
]);

const bio = ref<string>(
  `
🌟 Welcome! 🌟 In the dynamic world of digital solutions, finding a versatile full-stack
developer who can harmoniously blend creativity with technical expertise is akin to
discovering a rare gem. With a proven track record in crafting exceptional digital
experiences, I bring a wealth of skills to address your unique needs in a clear and
concise manner. ✅ Web Development Expertise: From designing visually stunning websites to
creating seamless user experiences, I specialize in crafting engaging web applications
that resonate with your target audience. ✅ Robust Back-End Solutions: Ensuring that your
applications not only look great but also function flawlessly is my top priority. I excel
in building reliable back-end solutions using technologies like Express.js and integrating
them with Nginx for efficient server-side performance. ✅ Secure and Scalable Solutions:
Your data security and application scalability are paramount. With expertise in
authentication, authorization, and database management, I implement robust measures to
safeguard your applications and ensure seamless scalability. ✅ Streamlined Deployment:
Leveraging Docker containerization, Linux server deployment, and Nginx for web server
configuration, I ensure that your applications are deployed efficiently and run smoothly
across different environments. ✅ Collaboration and Communication: With a strong
foundation in version control using GitHub, I prioritize seamless collaboration and
transparent communication throughout the development process, ensuring alignment with your
project goals. ✅ Problem-Solving Mindset: From error handling to performance
optimization, I approach challenges with a solution-oriented mindset to deliver optimal
results for your projects. Let's embark on a collaborative journey to transform your
digital vision into reality. Together, we can create cutting-edge solutions that elevate
your online presence, drive success for your business, and leave a lasting impact on your
audience.
`
);
</script>
