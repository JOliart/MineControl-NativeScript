const fs = require("fs");
const path = require("path");

const permissionsFile = path.join(
    __dirname,
    "..",
    "node_modules",
    "nativescript-permissions",
    "permissions.js"
);

const original =
    'require("@master.technology/permissions")';

const patched =
    'require("@master.technology/permissions/permissions.android.js")';

if (!fs.existsSync(permissionsFile)) {
    console.log(
        "[patch] nativescript-permissions no esta instalado. Se omite el parche."
    );
    process.exit(0);
}

let content = fs.readFileSync(
    permissionsFile,
    "utf8"
);

if (content.indexOf(patched) !== -1) {
    console.log(
        "[patch] nativescript-permissions ya esta corregido."
    );
    process.exit(0);
}

if (content.indexOf(original) === -1) {
    console.log(
        "[patch] No se encontro la linea esperada. No se realizaron cambios."
    );
    process.exit(0);
}

content = content.replace(
    original,
    patched
);

fs.writeFileSync(
    permissionsFile,
    content,
    "utf8"
);

console.log(
    "[patch] nativescript-permissions corregido correctamente."
);