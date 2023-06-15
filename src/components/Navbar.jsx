import { AppBar, IconButton, InputBase, Stack, Toolbar } from "@mui/material";
import { BsSearch, BsSpotify } from "react-icons/bs";

function Navbar({ query, onSubmit, onChange }) {
  return (
    <AppBar
      position="fixed"
      className=" bg-primary border-b border-zinc-500"
      sx={{ background: "#191414" }}
    >
      <Toolbar className="items-center justify-between p-2">
        <Stack direction="row" className="items-center" variant="h6">
          <BsSpotify className="text-2xl sm:text-4xl " />
          <p className="pl-1 sm:text-xl font-semibold ">
            Spotify |{" "}
            <span className="font-normal text-primary">Artistatics</span>{" "}
          </p>
        </Stack>

        <form
          onSubmit={onSubmit}
          className="bg-white sm:min-w-[400px] flex rounded-full overflow-hidden"
        >
          <IconButton
            type="submit"
            onSubmit={onSubmit}
            sx={{ p: "8px" }}
            aria-label="search"
          >
            <BsSearch className="text-xs sm:text-lg" />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: { xs: "12px", sm: "16px" } }}
            placeholder="Search your favourite artist"
            inputProps={{ "aria-label": "search google maps" }}
            className="w-full "
            value={query}
            onChange={onChange}
          />
        </form>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
