const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  selectedComponents: {},
};

const pcBuilderSlice = createSlice({
  name: "pcBuilder",
  initialState,
  reducers: {
    selectedComponent: (state, action) => {
      const { category, component } = action.payload;
      if (!state.selectedComponents[category]) {
        state.selectedComponents[category] = [];
      }
      const alreadyExists = state.selectedComponents[category].some(
        (item) => item.id == component.id
      );
      if (!alreadyExists) {
        state.selectedComponents[category].push(component);
      }
    },

    removeComponent: (state, action) => {
      const { category, id } = action.payload;
      state.selectedComponents[category] = state.selectedComponents[
        category
      ].filter((item) => item.id !== id);
    },
    resetBuilder: (state) => {
      state.selectedComponents = {};
    },
  },
});

export const { selectedComponent, resetBuilder, removeComponent } =
  pcBuilderSlice.actions;
export default pcBuilderSlice.reducer;
