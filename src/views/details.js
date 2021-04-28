import { html } from "../lib.js"

import { getItemById, deleteItem } from "../api/data.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Furniture Details</h1>
        </div>
    </div>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="card text-white bg-primary">
                <div class="card-body">
                    <img src=${item.img} />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <p>Make: <span>${item.make}</span></p>
            <p>Model: <span>${item.model}</span></p>
            <p>Year: <span>${item.year}</span></p>
            <p>Description: <span>${item.description}</span></p>
            <p>Price: <span>${item.price}</span></p>
            <p>Material: <span>${item.material}</span></p>
    
            ${isOwner ? html` <div>
                <a href=${`/edit/${item.objectId}`} class="btn btn-info">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
            </div>` : ''}
    
        </div>
    </div>
`;

export async function detailsPage(context) {
    console.log(context);
    const item = await getItemById(context.params.id);
    console.log(item);
    
    let isOwner = false;
    const userId = sessionStorage.getItem('userId');

    if (userId === item.owner.objectId) {
        isOwner = true;
    }

    context.render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
        let confirmed = confirm('Are you sure that you want to delete this item?');
        if (confirmed) {
            await deleteItem(item.objectId);
            context.page.redirect('/');
        }
    }
}