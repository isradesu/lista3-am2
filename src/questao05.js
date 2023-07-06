
function listPosts(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          createPagination(data);
        } else {
          console.log("Nenhum dado foi encontrado.");
        }
      })
      .catch(error => console.log(error));
  }

  function createPagination(data) {
    let itemsPerPage = 10;
    let totalPages = Math.ceil(data.length / itemsPerPage);

    showPage(data, 1, itemsPerPage);

    let pagination = document.getElementById("pagination");
    for (let i = 1; i <= totalPages; i++) {
      let link = document.createElement("a");
      link.href = "#"+ i;
      link.textContent = i;
      link.addEventListener("click", () => {
        showPage(data, i, itemsPerPage);
      });
      pagination.appendChild(link);
    }
  }

  function showPage(data, currentPage, itemsPerPage) {
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let pageData = data.slice(startIndex, endIndex);

    let commentsContainer = document.getElementById("comments");
    commentsContainer.innerHTML = "";

    pageData.forEach(comment => {
      let commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = comment.id +' - '+ comment.body;
      commentsContainer.appendChild(commentElement);
    });
  }

  listPosts("https://jsonplaceholder.typicode.com/posts");


  