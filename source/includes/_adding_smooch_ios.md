# Adding Smooch to your app

There are two ways to install the Smooch SDK. The recommended and easier way makes use of [CocoaPods](http://cocoapods.org) to manage library dependencies and SDK updates. Alternatively, you can go the manual route and drop the SDK into your Xcode project.

We've documented both methods for adding Smooch to your app. Read on and follow your preferred way of adding the SDK to your project.

## CocoaPods Method

First, install Cocoapods if it isn't already available on your system:

```
sudo gem install cocoapods
```

Now that you've installed CocoaPods, we'll add Smooch to your project's dependencies. Run these commands in terminal from the directory that houses your .xcodeproj file

```
$ echo "pod 'Smooch'" >> Podfile
```

```
$ pod install
```

Open the .xcworkspace file and add the necessary code to [initialize Smooch in your app](#import-the-smooch-header-file).

<aside class="notice">
Remember — when you use CocoaPods to manage your app's dependencies, you have to build and run your app using the .xcworkspace file and not the .xcodeproj file.
</aside>

## Manual Method

1. First, grab a copy of Smooch by [downloading the most recent release](https://github.com/smooch/smooch-ios/archive/master.zip) or visiting our [GitHub page](https://github.com/smooch/smooch-ios).

1. Next, add the SDK to your XCode project by dragging both Smooch.framework and Smooch.bundle into your project as shown below.
![Dependencies in XCode](/images/dependencies.png)

1. Now you'll have to add Smooch's dependencies to your project if they're not already linked in. Go to "Build phases" in your project's target and select "Link Binary With Libraries":
 * AssetsLibrary.framework
 * AVFoundation.framework
 * CFNetwork.framework
 * CoreGraphics.framework
 * CoreTelephony.framework
 * CoreText.framework
 * Foundation.framework
 * Photos.framework
 * QuartzCore.framework
 * SystemConfiguration.framework
 * UIKit.framework
1. Add the `-licucore` option to your app's `Other Linker Flags` build setting.
1. Smooch should now be available to your app and you're ready to add the necessary code to [initialize Smooch in your app](#initialize-smooch-in-your-app).

## Import the Smooch header file

Import the Smooch file into the your app delegate's .m file and any other places you plan to use it.

```objective_c
#import <Smooch/Smooch.h>
```
```swift
#import <Smooch/Smooch.h>
```

<aside class="notice">
If you're writing an app using Swift, then you'll need to import this header into a "bridging header". More info on this is available from [Apple](https://developer.apple.com/library/ios/documentation/swift/conceptual/buildingcocoaapps/MixandMatch.html)
</aside>

## Initialize Smooch in your app


After following the steps above, your app is setup for working with the Smooch SDK. Before your code can invoke its functionality, you'll have to initialize the library using your app's token.

This token is free and uniquely identifies your app and links it to the Smooch backend that does the heavy lifting necessary to bridge the gap between you and your users.

You can find your token by [logging into Smooch](https://app.smooch.io) and copying it from the settings page as shown below.

![App Token on Overview Page](/images/apptoken.png)

Once you've located your token, use the code below to initialize Smooch.


Add the following line of code to your applicationDidFinishLaunchingWithOptions: method

```objective_c
[Smooch initWithSettings:[SKTSettings settingsWithAppToken:@"YOUR_APP_TOKEN"]];
```
```swift
Smooch.initWithSettings(SKTSettings(appToken: "YOUR_APP_TOKEN"))
```

Make sure to replace `YOUR_APP_TOKEN` with your app token.

### Displaying the Smooch User Interface

Once you've initialized Smooch, you're ready to try it out.

Find a suitable place in your app's interface to invoke Smooch and use the code below to display the Smooch user interface. You can bring up Smooch whenever you think that your user will need access to help or a communication channel to contact you.

```objective_c
[Smooch show];
```
```swift
Smooch.show()
```

## Updating Smooch

### CocoaPods

To update via cocoapods, simply execute this

```
$ pod update
```

### Manual

To manually update Smooch simply grab a fresh copy of Smooch by [downloading the most recent release](https://github.com/smooch/smooch-ios/archive/master.zip) and re-add the SDK to your XCode project by dragging both Smooch.framework and Smooch.bundle into your project
