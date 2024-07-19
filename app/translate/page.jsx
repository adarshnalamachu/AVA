"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  AudioOutlined,
  AudioMutedOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";

import { translateapis } from "../services/translate"

import Avaicon from "../svgs/avaicon"

import Langicon from "../svgs/langicon"


import Link from "next/link";
import Closeicon from "../svgs/closeicon";

const SpeechRecognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

const SpeechComponent = () => {
  const languages = [
    { code: "en-US", name: "English" },
{ code: "es-ES", name: "Spanish" },
{ code: "fr-FR", name: "French" },
{ code: "de-DE", name: "German" }, 
{ code: "zh-CN", name: "Chinese (Mandarin)" },
{ code: "hi-IN", name: "Hindi" },
{ code: "ar-SA", name: "Arabic" },
{ code: "pt-PT", name: "Portuguese" },
{ code: "ru-RU", name: "Russian" },
{ code: "ms-MY", name: "Malay" },
{ code: "te-IN", name: "Telugu" }
  ];

  const [lang, setLang] = useState(languages[0].name);
  const [recognitionLang, setRecognitionLang] = useState(languages[0].code);
  const [lclicked, setLclicked] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const [supportResponses, setSupportResponses] = useState([]);
  const [isListeningUser, setIsListeningUser] = useState(false);
  const [isListeningSupport, setIsListeningSupport] = useState(false);
  const [playingUserIndex, setPlayingUserIndex] = useState(null);
  const [playingSupportIndex, setPlayingSupportIndex] = useState(null);

  const startRecognition = (setResponses, setOtherResponses, setIsListening,cond) => {
    if (cond =="support") 
      {
        recognition.lang = recognitionLang;
      }
    if (cond =="user") 
    {
      recognition.lang = "en-US";

    }
    recognition.start();

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      if(cond == "support") {
        setResponses((prevResponses) => [...prevResponses, transcript]);
        const res = await translateapis.text_to_english(transcript)
        console.log(res.data) 
        setOtherResponses((prevResponses) => [...prevResponses, res.data]);
      }
      if(cond == "user") {
        setResponses((prevResponses) => [...prevResponses, transcript]);
        const res = await translateapis.text_to_text(recognitionLang,transcript)
        console.log(res.data) 
        setOtherResponses((prevResponses) => [...prevResponses, res.data]);
      }
    };
  };

  const languageSet = (langName, langCode) => {
    setLang(langName);
    setRecognitionLang(langCode);
    setLclicked(!lclicked);
  };

  const clickHandler = () => {
    setLclicked(!lclicked);
  };

  const speakText = (text, index, setPlayingIndex) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = recognitionLang;
    utterance.onstart = () => setPlayingIndex(index);
    utterance.onend = () => setPlayingIndex(null);
    window.speechSynthesis.speak(utterance);
  };

  const togglePlayPauseUser = (index) => {
    if (playingUserIndex === index) {
      window.speechSynthesis.cancel();
      setPlayingUserIndex(null);
    } else {
      speakText(userResponses[index], index, setPlayingUserIndex);
    }
  };

  const togglePlayPauseSupport = (index) => {
    if (playingSupportIndex === index) {
      window.speechSynthesis.cancel();
      setPlayingSupportIndex(null);
    } else {
      speakText(supportResponses[index], index, setPlayingSupportIndex);
    }
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="flex flex-col bg-black text-white h-screen">
      <div className="flex flex-row justify-between gap-5 p-2 px-16 bg-tmode_bg">
        <div className="flex flex-row gap-5">
          <Avaicon/>
          <h1 className="self-center font-bold text-left text-2xl">
            Translate Mode
          </h1>
        </div>
        <Link href="/home" className="font-bold">
            <Closeicon/>
        </Link>
      </div>
      <div className="flex flex-row justify-between p-6 px-16">
        <div className="border py-2 px-6 w-5/12 bg-res_bg rounded-lg font-bold text-2xl">
          <p>English</p>
        </div>
        <div className="flex flex-row gap-6 w-5/12 ml-auto">
          <div className="relative flex flex-col w-full">
            <div
              className="border py-2 px-6 bg-use_bg w-full rounded-lg font-bold text-2xl"
              onClick={clickHandler}
            >
              <p>{lang}</p>
            </div>
            {lclicked && (
              <div className="absolute">
                <div className="border py-2 px-6 bg-use_bg w-full rounded-lg font-bold text-2xl" onClick={clickHandler}>
                  <p>{lang}</p>
                </div>
                
                <div >
                {languages?.map((item, index) => (
                  <button
                    key={index} 
                    className="border bg-use_bg w-full rounded-lg font-bold h-8 text-md"
                    onClick={() => languageSet(item.name, item.code)} 
                  >
                    <p>{item.name}</p>
                  </button>
                ))}
                </div> 
              </div>
            )}
          </div>
          <button onClick={clickHandler} className="p-2 bg-white rounded-xl">
            <Langicon/>
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-between p-6 px-16 max-h-96 overflow-y-scroll">
        <div className="flex flex-col w-5/12 items-left">
          {userResponses.map((response, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 py-2 px-6 rounded-lg font-bold text-3xl"
            >
              <p>{response}</p>
              <button
                className="self-end"
                onClick={() => togglePlayPauseUser(index)}
              >
                {playingUserIndex === index ? (
                  <PauseCircleOutlined />
                ) : (
                  <PlayCircleOutlined />
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-5/12 items-left">
          {supportResponses.map((response, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 py-2 px-6 text-use_bg rounded-lg font-bold text-3xl"
            >
              <p>{response}</p>
              <button
                className="self-start"
                onClick={() => togglePlayPauseSupport(index)}
              >
                {playingSupportIndex === index ? (
                  <PauseCircleOutlined />
                ) : (
                  <PlayCircleOutlined />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between p-6 px-16 ">
        <button
          className="px-4 py-2 bg-blue-500 rounded-full mt-4 self-center"

          onClick={() =>
            startRecognition(
              setUserResponses,
              setSupportResponses,
              setIsListeningUser,
              "user"
            )
          }
        >
          {isListeningUser ? <AudioMutedOutlined /> : <AudioOutlined />}
        </button>

        <button
          className="px-4 py-2 bg-blue-500 rounded-full mt-4 self-center"
          onClick={() =>
            startRecognition(
              setSupportResponses,
              setUserResponses,
              setIsListeningSupport,
              "support"
            )
          }
        >
          {isListeningSupport ? <AudioMutedOutlined /> : <AudioOutlined />}  
        </button>
      </div>
    </div>
  );
};

export default SpeechComponent;
