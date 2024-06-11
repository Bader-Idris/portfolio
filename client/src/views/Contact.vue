<template>
  <div class="about-me">
    <aside>
      <FoldableTab>
        <p>contacts</p>
      </FoldableTab>
      <div class="personal-contact">
        <p @click="addCopyIcon(0)">
          {{ contInfo[0] }}
          <i v-if="showIcon[0]" class="fa-solid fa-copy"></i>
        </p>
        <p @click="addCopyIcon(1)">
          {{ contInfo[1] }}
          <i v-if="showIcon[1]" class="fa-solid fa-copy"></i>
        </p>
      </div>
      <FoldableTab>
        <p>find-me-also-in</p>
      </FoldableTab>
      <div class="personal-socials">
        <ul>
          <li>YouTube Channel</li>
          <li>Front End Mentor</li>
          <li>Exercism</li>
          <li>CodeWar</li>
        </ul>
      </div>
    </aside>
    <div class="messaging">
      <label for="name">_name:</label>
      <input type="text" id="name" name="name" placeholder="John Doe">

      <label for="_email">_email:</label>
      <input type="email" id="_email" name="_email"
        placeholder="JohnDoe@gmail.com">

      <label for="_message">Message:</label>
      <textarea id="_message" name="_message" placeholder="I love your portfolio so much that I want you to code my website!"
        style="resize: vertical;"></textarea>

      <CustomButtons buttonType="default">submit-message</CustomButtons>
    </div>
    <div class="thank-you">
      <p>thank-you! <span>hand</span></p>
      <p>
        Your message has been accepted. You will receive answer really soon!
      </p>
      <CustomButtons buttonType="default">send-new-message</CustomButtons>
    </div>
    <div class="beautiful-results">
      <div class="first-query">
        <span>const</span>
        <div class="var-name">button</div>
        <div class="query">document.querySelector('#sendBtn')</div>
      </div>
      <div class="message-to-json">
        <span>const</span>
        <div class="var-name">message</div>
        <div class="event-listener"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-me {
  @include mainMiddleSettings;
  @media (max-width: 768px) {
    @include phone-borders;
  }
  aside {
    .personal-contact {
      position: relative;
      p {
        margin: 10px;
        cursor: pointer;
        width: fit-content;
        &::before {
          margin-right: 10px;
          font-family: 'Font Awesome 5 pro';
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
    .personal-socials {
      ul > li {
        width: fit-content;
        cursor: pointer;
        margin: 10px;
        padding: 0 10px;
        &::before {
          content: "\f35d";
          margin-right: 10px;
          font-family: 'Font Awesome 5 pro';
        }
        &:hover {
          color: $secondary4;
        }
      }
    }
  }
  .messaging {
    display: flex;
    flex-direction: column;
    align-content: flex-end;
    left: 320px;
    // width: calc(100vw - 400px);
    width: 400px;
    position: absolute;
    top: 20px;
    > * {
      margin-bottom: 10px;
    }
    textarea,
    input[type="text"],
    input[type="email"] {
      background: $primary3;
      border-radius: 5px;
      border: 2px solid transparent;
      padding: 10px;
      color: $secondary1;
      &:focus {
        outline: none;
        border: 2px solid $secondary1;
      }
      &::placeholder {
        color: $secondary1;
        opacity: 0.5;
      }
      &:focus::placeholder {
        color: transparent;
      }
    }
    button {
      width: fit-content;
      padding: 10px;
    }
  }
}
i {
  font-family: 'Font Awesome 5 pro';
  font-style: normal;
}
</style>

<script setup>
import { ref } from 'vue';
import FoldableTab from '@/components/FoldableTab.vue';
import CustomButtons from '@/components/CustomButtons.vue';

const contInfo = [
  'www.bader.com9@gmail.com',
  '+970595744368'
]

const showIcon = ref([false, false]);
const addCopyIcon = (index) => {
  showIcon.value = showIcon.value.map((value, i) => i === index ? true : value);
  setTimeout(() => {
    showIcon.value = showIcon.value.map((value, i) => i === index ? false : value);
  }, 1000);
};

// ===================================== //
// ========= put it in message ========= //
// ===================================== //
function formatDate(date) {
  const options = { weekday: 'short', day: '2-digit', month: 'short' };
  return date.toLocaleDateString('en-GB', options);
}
// Example usage
const date = new Date();
const formattedDate = formatDate(date);
console.log(formattedDate, ' => in contact'); // Output: Thu 23 Apr

</script>

<style lang="scss" scoped></style>