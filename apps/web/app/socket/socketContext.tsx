
import { createContext, ReactNode, useContext, useEffect } from "react";


import { io, Socket } from "socket.io-client";
import { useProfileQuery } from "~ui";

interface SocketProviderProps {
  children: ReactNode;
}
const SocketContext = createContext<{ socket: Socket }>({} as any);

const socket = io(process.env.NEXT_PUBLIC_API_BASE_ENDPOINT as string, { autoConnect: false });

const SocketContextProvider: React.FC<SocketProviderProps> = ({ children }) => {

	const {data}=useProfileQuery()
	const currentUser=data?.me

	useEffect(() => {
		if (!currentUser) return;

		socket.auth = { ...currentUser };
		socket.connect();
	}, [currentUser]);

	useEffect(() => {
		const onConnect = () => {
			console.log("Connected");

			// Emit message to all connected friends
		};
		socket.on("connect", onConnect);
		return () => {
			socket.removeListener("connect", onConnect);
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

const useSocketContext = () => useContext(SocketContext);

export { SocketContextProvider };
export default useSocketContext;
