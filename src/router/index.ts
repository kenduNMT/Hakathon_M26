import { createRouter, createWebHistory } from "vue-router";
import DashBoard from "../components/DashBoard.vue";
import ManagerUser from "../components/ManagerUser.vue";
import ManagerProduct from "../components/ManagerProduct.vue";

const routes = [
    {
        path: "/admin",
        Component: DashBoard,
        alias: "/",
        children: [
            { path: "", name: "dashboard", component: DashBoard },
            {
                path: "manager-product",
                name: "manager-product",
                component: ManagerProduct,
            },
            {
                path: "manager-user",
                name: "manager-user",
                component: ManagerUser,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


export default router;