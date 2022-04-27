import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  connectSearchBox,
  connectStateResults,
  InstantSearch,
} from "react-instantsearch-dom";
import { Input, Pressable, Text, useTheme } from "native-base";
import { FaHome, FaSearch } from "react-icons/all";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const searchClient = algoliasearch(
  "YNLR4EWEJ4",
  "876efc7750458504e73d769de1d5e989"
);

const SearchBar = ({ index, setUserSelected }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const StateResults = ({ searching, searchResults, searchState }) => {
    const isSearching =
      searchState.query !== undefined && searchState.query !== "";
    const displayResults = isSearching && searchResults;
    const hasResults = searchResults && searchResults.nbHits !== 0;
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.15)",
        }}
        className="d-flex flex-column"
      >
        {displayResults &&
          searchResults.hits.slice(0, 5).map((hit) => (
            <div
              style={{
                cursor: "pointer",
              }}
              className="animate-shadow"
            >
              <Pressable
                p={3}
                onPress={() => {
                  if (index === "listings") {
                    navigate(`/listings/${hit.objectID}`);
                  } else {
                    setUserSelected(hit.objectID);
                  }
                }}
              >
                <div className="d-flex flex-row align-items-center">
                  <div className="d-flex justify-content-center align-items-center p-1 me-3">
                    {index === "listings" ? <FaHome size={20} /> : <FaUser />}
                  </div>
                  <div className="d-flex flex-column">
                    <Text fontWeight={200}>
                      {index === "users"
                        ? hit.displayName
                        : hit.fullAddress
                        ? hit.fullAddress
                        : "No Address"}
                    </Text>
                    <Text fontSize={12} color="muted.500" fontWeight={200}>
                      {" "}
                      {hit.email ? hit.email : "No email address"}
                    </Text>
                  </div>
                </div>
              </Pressable>
            </div>
          ))}
        {displayResults && !hasResults && (
          <div className="px-4 py-2 d-flex justify-content-center align-items-center">
            <Text>No results</Text>
          </div>
        )}
      </div>
    );
  };
  const SearchBox = ({ currentRefinement, refine }) => {
    return (
      <div
        className="animate-shadow-search"
        style={{
          borderRadius: 100,
          backgroundColor: "white",
        }}
      >
        <Input
          size="lg"
          placeholder={
            index === "listings"
              ? "Search by address"
              : "Search by name or email"
          }
          _hover={{ bg: "white" }}
          fontWeight={300}
          borderRadius={100}
          bg="white"
          borderWidth={0}
          py={3}
          px={4}
          variant="rounded"
          InputLeftElement={
            <FaSearch
              style={{ marginLeft: 20 }}
              color={theme.colors.muted["500"]}
            />
          }
          type="search"
          value={currentRefinement}
          onChange={(e) => refine(e.currentTarget.value)}
        />
      </div>
    );
  };
  const CustomStateResults = connectStateResults(StateResults);
  const CustomSearchBox = connectSearchBox(SearchBox);
  return (
    <div className="d-flex">
      <InstantSearch indexName={index} searchClient={searchClient}>
        <div style={{ position: "relative" }}>
          <CustomSearchBox />
          <div style={{ position: "absolute", zIndex: 1, right: 0 }}>
            <CustomStateResults />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default SearchBar;
