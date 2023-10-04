const menuBtn = document.querySelector('#menu-tlacitko');
const menu = document.querySelector('#menu-polozky');
if (menuBtn && menu) {
    const menuIcon = menuBtn.querySelector('i');
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('show');
        if (!menuIcon) {
            return;
        }
        menuIcon.classList.toggle('fa-xmark');
        menuIcon.classList.toggle('fa-bars');
    })
}