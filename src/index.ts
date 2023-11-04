const problem = document.getElementsByClassName('problem')[0];

problem.addEventListener('click', () => {
  console.log('clicked cunt');
});

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5288/get-arithmetic-mp');

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}


fetchData();


// use pnpm start