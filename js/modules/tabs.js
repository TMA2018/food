function tabs(parentTabSelector, tabsSelector, tabContentSelector, activeTabSelector) {
    const
        /*parentTab = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');*/
        parentTab = document.querySelector(parentTabSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector);

    //tabs
    function hideContent() {
        tabContent.forEach(tab => {
            tab.classList.add('hide');
            tab.classList.remove('show','fade');
        });
        tabs.forEach (tab => {
            //tab.classList.remove('tabheader__item_active');
            tab.classList.remove(activeTabSelector);
        });
    }

    function showContent(i = 0){
        tabContent[i].classList.add('show','fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(activeTabSelector);
    }

    parentTab.addEventListener('click', (evt) => {
        let target = evt.target;
        // console.log(evt.target);
        // console.log(evt);       
        if(target && target.classList.contains(tabsSelector.slice(1))){         
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });
    //hideContent();
    //showContent();
    hideContent();
    showContent();
}

export default tabs;