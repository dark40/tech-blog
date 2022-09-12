const post_id = document.querySelector('input[name="post-id"]').value;
console.log(post_id);

// add the comment
const newCommentHandler = async (event) => {
  event.preventDefault();


  const commentContent = document.querySelector('input[name="commentContent"]').value
  

  if (commentContent) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ post_id, commentContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);
