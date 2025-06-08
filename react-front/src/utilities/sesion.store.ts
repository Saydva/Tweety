type sessionStorageProps = {
  userName: string | null;
  loggIn: string | null;
  setName: (user: string) => void;
  setLoggIn: (loggIn: boolean) => void;
};

export const sessionStore: sessionStorageProps = {
  userName: sessionStorage.getItem("user"),
  loggIn: sessionStorage.getItem("loggIn"),
  setName: (user: string) => {
    sessionStorage.setItem("user", user);
  },
  setLoggIn: (loggIn: boolean) => {
    sessionStorage.setItem("loggIn", JSON.stringify(loggIn));
  },
};
