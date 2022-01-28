import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  BarController,
  LineController,
  DoughnutController,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  LinearScale,
  PointElement,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";

export default function initConfig() {
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    BarController,
    LineController,
    DoughnutController,
    CategoryScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    LinearScale,
    PointElement,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
    zoomPlugin
  );
  Chart.defaults.color = "#001219";
  Chart.defaults.font.family = "Kanit, sans-serif";
  Chart.defaults.font.weight = "300";
}
