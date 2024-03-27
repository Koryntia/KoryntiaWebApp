export const toggleSidebar = (
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setSidebarOpen((prevState: boolean) => !prevState);
};
