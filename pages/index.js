import styles from "../styles/banner.module.css";
import Navbar from "../components/Navbar";
export default function Home() {
  return (
    <>
     <Navbar />
    <div className={styles.banner}>
      <h1 className={styles.header}>
        Pronto Laundry <br></br>Services
      </h1>
    </div>
    {/* <section id="Contact">
   <Reviews/>
   </section> */}
    </>
  );
}
