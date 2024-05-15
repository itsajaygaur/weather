import { search } from "@/app/actions";
import styles from '../app/page.module.scss'

export default function Search(){
    return(
        <form action={search}>
        <input name='city' type="text" className={styles['search-input']} placeholder='search for cities' />
      </form>

    )
}