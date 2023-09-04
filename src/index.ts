import Template from './templates/Template';
console.log('hola');

(async function App() {
    const main = null || document.getElementById('main');
    if (main) {
        main.innerHTML = await Template();
    }
})();
