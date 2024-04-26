<template>
  <div class="about">
    <h1>This is an about page for testing</h1>
  </div>
  <section class="howdy">
    <div>Howdy!</div>
    <p>
      Lorem, ipsum dolor sit amet consectetur
      adipisicing elit. Deleniti totam pariatur
      earum optio enim natus.
    </p>
    <button @click="displayToastify">display toastify</button>
  </section>
</template>

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const displayToastify = () => {
  // const resolveWithSomeData = new Promise((resolve, reject) => setTimeout(() => resolve({ message: 'world' }), 3000));
  const resolveWithSomeData = async () => await (await fetch('http://localhost:3000/sweety')).json();
  toast.promise(
    resolveWithSomeData,
    {
      pending: {
        render() {
          return "I'm loading Yo";
        },
        // other options
        icon: false,
      },
      success: {
        render(res) {
          // return 'Hello ' + res.data.message;
          return 'Hello ' + res.data.msg;
        },
        // other options
        icon: '🟢',
      },
      error: {
        render(err) {
          // When the promise reject, data will contains the error
          return h('div', 'Err: ' + err.data.message);
          // return 'Err: ' + err.data.message;
        },
        // render: 'just text',
        // render: h('div', 'error'),
      },
    },
    {
      position: toast.POSITION.TOP_RIGHT,
    }
  );
};
</script>