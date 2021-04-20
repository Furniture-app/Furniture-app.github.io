import { html } from "../lib.js"

import { getMyFurniture } from "../api/data.js";
import { itemPreviewTemplate } from "./common/item.js";

const myFurnitureTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>My Furniture</h1>
            <p>This is a list of your publications.</p>
        </div>
    </div>
    <div class="row space-top">
        ${data.map(itemPreviewTemplate)}
    </div>
`;

export async function myFurniturePage(context) {
    const myFurniture = await getMyFurniture();

    context.render(myFurnitureTemplate(myFurniture));
}