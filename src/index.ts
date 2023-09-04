import Template from './templates/Template';
import './styles/main.css';

(async function App() {
    const main = null || document.getElementById('main');
    if (main) {
        main.innerHTML = await Template();
    }
})();
