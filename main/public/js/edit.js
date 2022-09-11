const post_id = document.querySelector('input[name="post')

// Edit the post
const editFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();


    if (title && content) {
        const response = await fetch(`/api/edit/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert('Failed to update post');
          }

    }
}


// Delete the post
const delButtonHandler = async (event) => {
    event.preventDefault();

   await fetch(`/api/projects/${id}`, {
    method: 'DELETE',
   }) 

   document.location.replace('/dashboard');
};

document
    .querySelector('#edit-post-form')
    .addEventListener('click', editFormHandler);
document
    .querySelector('#delete-btn')
    .addEventListener('click', delButtonHandler);
