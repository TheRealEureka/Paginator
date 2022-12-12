/**
 * @author: TheRealEureka
 * @link: https://github.com/TheRealEureka/Paginator
 */
export class Paginator{
    constructor(container, pagination, options = {'element_per_page' : 15, 'max_button_number' : 5}) {
        this._page = 1;
        this._elem_per_page= options.element_per_page;
        this._max_button_number = options.max_button_number;
        this._body = document.getElementById(container);
        this._elems = this._body.children;
        this._nbchild = this._elems.length;
        this._nbpage = Math.ceil(this._nbchild/this._elem_per_page);
        this._disp_page = document.getElementById(pagination);
        if(this._nbpage>1)
        {
            let prev = document.createElement("li");
            let next = document.createElement("li");
            prev.innerHTML = '<span aria-label="Previous"><span aria-hidden="true">&laquo;</span></span>'
            next.innerHTML = '<span aria-label="Next"><span aria-hidden="true">&raquo;</span></span>'
            prev.addEventListener("click",  () =>{
                if(this._page > 1 )
                {
                    this._page--;
                    this.display()
                }
            })
            next.addEventListener("click", () => {
                if(this._page < this._nbpage)
                {
                    this._page++;
                    this.display()
                }
            })
            this._disp_page.appendChild(prev);
            this._disp_page.appendChild(next);
        }
        this.display()
        this.display_pages()
    }
    display(){
        if(this._body !== undefined){
            let show = document.getElementsByClassName("show_tab");
            while(show.length > 0){
                show[0].classList.add("hidden");
                show[0].classList.remove("show_tab");
            }
            let elem_start = (this._page-1) * this._elem_per_page;
            let elem_stop = this._page * this._elem_per_page;
            for(let i = elem_start ; i < elem_stop && i < this._nbchild; i++){
                let elem = this._elems[i];
                elem.classList.toggle("hidden");
                elem.classList.toggle("show_tab");
            }
        }
        this.display_pages();
    }
    display_pages(){
        if(this._nbpage > 1) {
            let btns = document.getElementsByClassName("btn_number");
            while (btns.length > 0) {
                btns[0].remove();
            }
            let start = 1;
            if (this._page > (Math.ceil(this._max_button_number / 2) - 1)) {
                start = this._page - (Math.ceil(this._max_button_number / 2) - 1);
            }
            if (this._nbpage <= this._page + (Math.ceil(this._max_button_number / 2) - 1)) {
                start = (this._nbpage - this._max_button_number) + 1;
            }

            let stop = start + this._max_button_number;
            for (let i = start; i <= this._nbpage && i < stop; i++) {
                let li = document.createElement("li");
                li.classList.add("clicable");
                li.classList.add("btn_number");
                if (i === this._page) {
                    li.classList.add("active");
                }
                let a = document.createElement("span");
                a.innerText = i+'';
                li.appendChild(a);
                li.addEventListener("click", () => {
                    this._page = i;
                    let act = this._disp_page.querySelector(".active")
                    if (act !== undefined) {
                        act.classList.remove("active");
                    }
                    li.classList.add("active");
                    this.display();
                });
                this._disp_page.insertBefore(li, this._disp_page.lastChild);
            }

        }
    }
}