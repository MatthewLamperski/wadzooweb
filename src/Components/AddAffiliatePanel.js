import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  InputRightAddon,
  Pressable,
  Spinner,
  Text,
  useTheme,
} from "native-base";
import { FaSearch, FaTimesCircle } from "react-icons/all";
import {
  createAffiliateDoc,
  doesPromoCodeExist,
  findUsersByEmail,
  isUserAlreadyAffiliate,
} from "../FirebaseInterface";
import { AppContext } from "../AppContext";
import { toast } from "react-toastify";

const AddAffiliatePanel = () => {
  const theme = useTheme();
  const { setError, user } = useContext(AppContext);
  const [search, setSearch] = useState();
  const [searching, setSearching] = useState(false);
  const [searchUsers, setSearchUsers] = useState();
  const [affiliate, setAffiliate] = useState();
  const [code, setCode] = useState();
  const [underCurrentUser, setUnderCurrentUser] = useState(false);
  const [adding, setAdding] = useState(false);
  const [share, setShare] = useState();

  useEffect(() => {
    if (search) setSearching(true);
    const delayDebounce = setTimeout(() => {
      if (search && search.length > 3) {
        findUsersByEmail(search)
          .then((users) => {
            setSearchUsers(users);
            setSearching(false);
          })
          .catch((err) => {
            setSearching(false);
            console.log(err);
          });
      } else {
        setSearching(false);
        setSearchUsers();
      }
    }, 2000);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    if (affiliate) {
      isUserAlreadyAffiliate(affiliate.uid)
        .then((isAffiliate) => {
          if (isAffiliate) {
            setAffiliate();
            setError({
              title: "Error",
              message: "This user already has an affiliate code.",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, [affiliate]);
  const handleAddAffiliate = () => {
    if (!adding) {
      setAdding(true);
      doesPromoCodeExist(code)
        .then((exists) => {
          if (exists) {
            setCode();
            setError({
              title: "Error",
              message:
                "This promo code has been taken, please try another one.",
            });
            setAdding(false);
          } else {
            let newAffiliate = {
              user: affiliate.uid,
              promoCode: code,
              ...(underCurrentUser
                ? {
                    parent: {
                      uid: "Xp5osrasWmeKPe7ebs78A0Akh4r1",
                      share,
                    },
                  }
                : {}),
            };
            createAffiliateDoc(newAffiliate)
              .then(() => {
                setAffiliate();
                setSearchUsers();
                setAdding(false);
                toast.success(
                  "New affiliate has been added and can now be used!"
                );
              })
              .catch((err) => {
                setError({
                  title: "Something went wrong...",
                  message: "Please try again later.",
                });
                setAdding(false);
              });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={styles.containerStyle}>
      <Text fontWeight={300} fontSize={16} color="secondary.800">
        Add New Affiliate
      </Text>
      <Text pb={3} fontSize={14} color="muted.500">
        Affiliates must have a Wadzoo account. If they do not have an account
        yet, email development@wadzoo.com and I will get one set up for them.
      </Text>
      {affiliate ? (
        <div style={styles.affiliate}>
          <div className="d-flex flex-row justify-content-between">
            <Text fontSize={14}>Selected User:</Text>
            <Pressable
              p={1}
              onPress={() => {
                setAffiliate();
              }}
            >
              <FaTimesCircle color={theme.colors.error["500"]} size={16} />
            </Pressable>
          </div>
          <div style={styles.searchResult}>
            <Text>{`${affiliate.firstName} ${affiliate.lastName}`}</Text>
            <Text>{affiliate.email}</Text>
          </div>
        </div>
      ) : (
        <div style={styles.findUser}>
          <Text>1. Find User:</Text>
          <Input
            bg="white"
            _hover={{ bg: "white" }}
            InputLeftElement={
              <FaSearch
                style={{ marginLeft: 10 }}
                size={16}
                color={theme.colors.muted["400"]}
              />
            }
            _text={{ color: "red.500" }}
            placeholder="Email Address"
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
          {searchUsers ? (
            searchUsers.length === 0 ? (
              <div>
                <Text>No users found associated witht that email address.</Text>
              </div>
            ) : (
              <div style={styles.searchResultsContainer}>
                {searchUsers.slice(0, 5).map((user) => (
                  <Pressable
                    onPress={() => {
                      setAffiliate(user);
                      setSearchUsers();
                      setSearch();
                    }}
                  >
                    <div style={styles.searchResult}>
                      <Text>{`${user.firstName} ${user.lastName}`}</Text>
                      <Text>{user.email}</Text>
                    </div>
                  </Pressable>
                ))}
              </div>
            )
          ) : searching ? (
            <div className="d-flex p-3">
              <Spinner p={4} color="primary.500" />
            </div>
          ) : null}
        </div>
      )}
      {affiliate && (
        <div className="py-2 d-flex flex-column">
          <div className="d-flex pb-2 flex-row justify-content-start align-items-center">
            <Text>Create Affiliate Code</Text>
            <Text pl={1} fontSize={12} color="muted.500">
              (all caps)
            </Text>
          </div>
          <Input
            value={code ? code : ""}
            w="100%"
            bg="white"
            _hover={{ bg: "white" }}
            placeholder="Affiliate Code"
            onChangeText={(text) => {
              setCode(text.toUpperCase());
            }}
          />
          <Checkbox
            bg="white"
            my={3}
            _text={{ color: "black", fontSize: 14 }}
            onChange={(val) => setUnderCurrentUser(val)}
          >
            Add affiliate underneath Larry.
          </Checkbox>
        </div>
      )}
      {underCurrentUser && affiliate ? (
        <div style={styles.findUser} className="d-flex flex-column">
          <Text>Percent Share</Text>
          <Text pb={2} pl={1} fontSize={12} color="muted.500">
            This is the percentage of profit that comes in from this code that
            will go to the affiliate. The rest (until 50%) will go to Larry.
          </Text>
          <InputGroup>
            <Input
              value={share ? share : ""}
              bg="white"
              _hover={{ bg: "white" }}
              placeholder="Percent shared"
              onChangeText={(text) => {
                if (/[0-9]/.test(text) || text === "") {
                  setShare(text);
                } else {
                  setError({
                    title: "Only input numbers",
                    message: "Please only type numbers, in percentage.",
                  });
                }
              }}
            />
            <InputRightAddon
              bg="muted.300"
              _text={{ color: "black" }}
              children={"%"}
            />
          </InputGroup>
        </div>
      ) : null}
      <Button
        my={2}
        w="100%"
        variant="subtle"
        isDisabled={
          !(
            affiliate &&
            code &&
            ((underCurrentUser && share) || (!underCurrentUser && !share))
          )
        }
        isLoading={adding}
        isLoadingText="Processing..."
        onPress={handleAddAffiliate}
      >
        Add Affiliate
      </Button>
    </div>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 30,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
  },
  findUser: {
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 20,
    backgroundColor: "#f0f0f0",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
  },
  searchResultsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  searchResult: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 8,
    backgroundColor: "white",
    padding: 10,
    margin: 5,
  },
  affiliate: {
    borderRadius: 8,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.01), 0 6px 20px 0 rgba(0, 0, 0, 0.03)",
    padding: 20,
    backgroundColor: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
  },
};

export default AddAffiliatePanel;
