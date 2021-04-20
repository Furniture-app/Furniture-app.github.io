import { html } from "../lib.js"

import { getAllFurniture } from "../api/data.js";
import { itemPreviewTemplate } from "./common/item.js";

const dashboardTemplate = (data) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Welcome to Furniture System</h1>
            <p>Select furniture from the catalog to view details.</p>
        </div>
    </div>
    <div class="row space-top">
        ${data.map(itemPreviewTemplate)}
    </div>
`;
export async function dashboardPage(context) {
    const data = await getAllFurniture();

    context.render(dashboardTemplate(data));
}