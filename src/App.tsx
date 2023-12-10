import styles from "./app.module.scss";
import { MultiSelect } from "./components/MultiSelect";

function App() {
  return (
    <div className={styles.root}>
      <MultiSelect />
    </div>
  );
}

export default App;
