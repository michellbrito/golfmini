"use client";

import {
  Heading,
  Icon,
  Input,
  Stack,
  createListCollection,
  HStack,
  Button,
} from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";
import { Radio, RadioGroup } from "@/components/ui/radio";
import { GiPirateHat, GiJungle } from "react-icons/gi";
import { MdCastle, MdLightMode } from "react-icons/md";
import styles from "./index.module.css";

export default function Filters({ filter, setFilter }) {
  const items = [
    {
      value: "name",
      title: "Name",
      content: (
        <Input
          placeholder="Enter location name"
          value={filter.name}
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
      ),
    },
    {
      value: "location",
      title: "Location",
      content: (
        <SelectRoot
          collection={states}
          value={filter.state}
          onValueChange={(e) => setFilter({ ...filter, state: e.value })}
        >
          <SelectTrigger clearable>
            <SelectValueText placeholder="Select state" />
          </SelectTrigger>
          <SelectContent bgColor="#685752">
            {states.items.map((state) => (
              <SelectItem item={state} key={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      ),
    },
    {
      value: "type",
      title: "Type",
      content: (
        <RadioGroup
          className={styles.typeContainer}
          value={filter.type}
          onValueChange={(e) => setFilter({ ...filter, type: e.value })}
        >
          <HStack gap="6">
            <Radio value="ALL">All</Radio>
            <Radio value="INDOOR">Indoor</Radio>
            <Radio value="OUTDOOR">Outdoor</Radio>
          </HStack>
        </RadioGroup>
      ),
    },
    {
      value: "theme",
      title: "Theme",
      content: (
        <RadioCardRoot
          orientation="horizontal"
          align="center"
          justify="center"
          maxW="lg"
          value={filter.theme}
          onValueChange={({ value }) => setFilter({ ...filter, theme: value })}
        >
          {radioItems.map((item) => (
            <RadioCardItem
              bgColor="#685752"
              _hover={{
                bg: "#8EB486",
                color: "#685752",
                "& svg": { color: "#685752" },
              }}
              _checked={{
                bg: "#8EB486",
                color: "#685752",
                borderWidth: "1px",
                borderColor: "black",
                "& svg": {
                  color: "#685752",
                },
              }}
              transition="backgrounds"
              color="#FDF7F4"
              label={item.title}
              icon={
                <Icon fontSize="2xl" color="#FDF7F4">
                  {item.icon}
                </Icon>
              }
              indicator={false}
              key={item.value}
              value={item.value}
            />
          ))}
        </RadioCardRoot>
      ),
    },
  ];

  return (
    <>
      <div className={styles.mobileRoot}>
        <DialogRoot size="full" motionPreset="slide-in-bottom">
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Open Dialog
            </Button>
          </DialogTrigger>
          <DialogContent bgColor="#FDF7F4" color="">
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Input placeholder="Enter location name" />
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button>Save</Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </div>
      <Stack width="full" className={styles.root}>
        <Heading size="lg">Filters</Heading>
        {FinalizationRegistry.theme}
        <AccordionRoot
          collapsible
          defaultValue={["name", "location", "type", "theme"]}
          multiple={true}
        >
          {items.map((item) => (
            <AccordionItem
              className={styles.accordionItem}
              key={item.value}
              value={item.value}
            >
              <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
              <AccordionItemContent className={styles.accordionItemContent}>
                {item.content}
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      </Stack>
    </>
  );
}

const states = createListCollection({
  items: [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ],
});

const radioItems = [
  { value: "PIRATE", title: "Pirate", icon: <GiPirateHat /> },
  {
    value: "glow_in_the_dark",
    title: "Glow In The Dark",
    icon: <MdLightMode />,
  },
  { value: "JUNGLE", title: "Jungle", icon: <GiJungle /> },
  { value: "CASTLE", title: "Castle", icon: <MdCastle /> },
];
