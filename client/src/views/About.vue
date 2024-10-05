<template>
  <div class="about-me">
    <FoldableTab @toggle="toggleHobbies">
      <p>personal_info</p>
    </FoldableTab>
    <div class="hobbies-bar" :class="{ hidden: isHobbiesHidden }">
      <p v-for="hobby in hobbiesObj" :key="hobby.title">{{ hobby.title }}</p>
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
</template>

<style lang="scss" scoped>
.about-me {
  @include mainMiddleSettings;
  @media (max-width: 768px) {
    @include phone-borders;
  }
  .hobbies-bar {
    &.hidden {
      display: none;
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
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import { Clipboard } from "@capacitor/clipboard";
import FoldableTab from "@/components/FoldableTab.vue";

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

const hobbiesObj: Hobby[] = [
  { title: "bio", icon: "", iconAlt: "" },
  { title: "interests", icon: "", iconAlt: "" },
  { title: "education", icon: "", iconAlt: "" },
  { title: "high-school", icon: "", iconAlt: "" },
  { title: "University", icon: "", iconAlt: "" }
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
</script>
