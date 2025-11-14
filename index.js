let prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let html = document.querySelector('html');

let savedTheme = localStorage.getItem('theme');
let currentTheme = savedTheme || prefers;

html.classList.add(currentTheme);
html.setAttribute('data-theme', currentTheme);

function toggleTheme() {
  let newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  html.classList.remove('light', 'dark');
  html.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
  }
});

let table = new DataTable('#table', {
  ajax: "tabla.json",
  stateSave: true,
  stateDuration: 0,
  deferRender: true,
  responsive: true,
  fixedHeader: true,
  columns: [
    { data: "autor", className: "dt-body-left dt-head-center", width: "20%" },
    { data: "titulo", className: "dt-body-left dt-head-center", width: "35%" },
    {
      data: "comprado",
      searchable: false,
      className: "dt-body-center dt-head-center",
      width: "1%",
      render: (data, type) =>
        type === "export"
          ? data.replace(/&#xf046/g, "1").replace(/&#xf096/g, "0")
          : `<i class="fa-regular">${data}</i>`
    },
    {
      data: "leido",
      searchable: false,
      className: "dt-body-center dt-head-center",
      width: "1%",
      render: (data, type) =>
        type === "export"
          ? data.replace(/&#xf046/g, "1").replace(/&#xf096/g, "0")
          : `<i class="fa-regular">${data}</i>`
    },
    { data: "isbn", orderable: false, className: "dt-body-right dt-head-center", width: "1%" },
    { data: "isbn13", orderable: false, className: "dt-body-right dt-head-center", width: "1%" },
    { data: "prestado", className: "dt-body-left dt-head-center" }
  ],
  buttons: [
    { extend: 'copyHtml5', text: '<i class="fa-regular fa-copy"></i>', titleAttr: 'Copiar', exportOptions: { orthogonal: 'export' } },
    { extend: 'excelHtml5', text: '<i class="fa-regular fa-file-excel"></i>', titleAttr: 'Excel', exportOptions: { orthogonal: 'export' } },
    { extend: 'csvHtml5', text: '<i class="fa-regular fa-file-lines"></i>', titleAttr: 'CSV', exportOptions: { orthogonal: 'export' } },
    { extend: 'pdfHtml5', text: '<i class="fa-regular fa-file-pdf"></i>', titleAttr: 'PDF', exportOptions: { orthogonal: 'export' } },
    { extend: 'colvis', text: '<i class="fa-regular fa-eye-slash"></i>', titleAttr: 'Columnas' }
  ],
  layout: {
    top: ['pageLength', 'buttons', 'search'],
    topStart: null,
    topEnd: null,
    // bottomStart: 'info',
    // bottomEnd: 'paging'
    top2: [
      {
        div: {
          className: 'layout-title',
          text: 'Catalogo de Libros'
        }
      }
    ],
    bottom2: [
      {
        div: {
          text: 'Desarrollado por Gulymaestro.'
        }
      }
    ]
  },
  language: {
    url: "https://cdn.datatables.net/plug-ins/2.3.4/i18n/es-ES.json"
  }
});
