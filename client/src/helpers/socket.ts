import io from "socket.io-client";
import { API_URL } from "../services/api";

const socket = io(`${API_URL}/chat`);

export default socket;