 const ctxBar = document.getElementById('barGrowth').getContext('2d');
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [{
        data: [10, 20, 40, 70, 100, 130],
        backgroundColor: '#351EBF',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, display: false },
        x: { display: false }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      }
    }
  });