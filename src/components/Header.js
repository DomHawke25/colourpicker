import '../styles/header.css';

const iconList = {
    'back': {
        'href': 'https://domhawke25.github.io/Projects/',
        'src': 'https://domhawke25.github.io/Projects/images/icons8-left-arrow-100.png',
        'alt': 'left icon by icons8.com',
        'title': 'Homepage'
    },
    'github': {
        'href': 'https://github.com/DomHawke25',
        'src': 'https://domhawke25.github.io/Projects/images/icons8-github-96.png',
        'alt': 'github icon by icons8.com',
        'title': 'Github'
    },
    'codepen': {
        'href': 'https://codepen.io/DomHawke',
        'src': 'https://domhawke25.github.io/Projects/images/icons8-codepen-100.png',
        'alt': 'codepen icon by icons8.com',
        'title': 'CodePen'
    },
    'linkedIn': {
        'href': 'https://www.linkedin.com/in/dominic-hawke/',
        'src': 'https://domhawke25.github.io/Projects/images/icons8-linkedin-96.png',
        'alt': 'linked in icon by icons8.com',
        'title': 'LinkedIn'
    }
}

function createIcon(selectedIcon) {
    return (
        <li className={selectedIcon === 'back' ? 'headerIcon back': 'headerIcon'}>
            <a href={iconList[selectedIcon].href}>
                <img
                    src={iconList[selectedIcon].src}
                    alt={iconList[selectedIcon].alt}
                    title={iconList[selectedIcon].title}
                />
            </a>
        </li>
    )
}

function Header() {
    return (
        <ul className='header'>
            {createIcon('back')}
            <li><a href="" title='View Code'>View Code</a></li>
            {createIcon('github')}
            {createIcon('codepen')}
            {createIcon('linkedIn')}
        </ul>
    )
}

export default Header;