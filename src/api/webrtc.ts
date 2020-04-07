declare global {
  interface Window {
    RTCPeerConnection: any;
    RTCSessionDescription: any;
  }
}

const { RTCPeerConnection, RTCSessionDescription } = window;
import socketIO from "../api/socketIO";

export const peerConnection = new RTCPeerConnection();

export async function callUsersInRoom(roomId: string) {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

  socketIO.emit("call-users", {
    socketId: socketIO.id,
    roomId,
    offer
  });
}

export async function makeAnswer(socketId: string, offer: RTCOfferOptions) {
  console.log(offer)
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socketIO.emit("make-answer", {
    answer,
    to: socketId
  });
}
