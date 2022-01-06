import { Guild, GuildMember, Message, Snowflake, SnowflakeUtil, TextChannel } from "discord.js";
import MS, { StringValue } from "ms";

export class Utils {
    /**
     *
     * Import a module with ease.
     * @param filePath The path of the file to import.
     * @see Typescript only
     */
    public async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    /**
     *
     * @param mem The ID or name of the member to get.
     * @param guild The guild where the member resides.
     * @example```ts
     * getMember('Nick', message.guild)
     * ```
     */
    getMember(mem: string, guild: Guild) {
        const member = guild.members.cache.find(
            (m) =>
                m.id === mem ||
                m.user.username === mem ||
                m.displayName === mem ||
                m.user.tag === mem
        );
        if (member) return member;
        else return null;
    }

    /**
     *
     * Formats a string.
     * @param str String to format.
     * @example```ts
     * formatString('TEST') // Test
     * ```
     */
    public formatString(str: string) {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    }

    /**
     *
     * Generates a random ID.
     * @example```ts
     * generateId() // 928616268376965120
     * ```
     */
    public generateId() {
        return SnowflakeUtil.generate().toString();
    }
    /**
     *
     * Creates a codeblock.
     * @param content The content for the codeblock.
     * @param language The language for the codeblock.
     * @example```ts
     * codeBlock("console.log('Hello World')", "javascript")
     * ```
     */
    public codeBlock(content: string, language?: string) {
        return language ? `\`\`\`${language}\n${content}\`\`\`` : `\`\`\`${content}\`\`\``;
    }

    /**
     *
     * Mention a user with ease.
     * @param userId The ID of the user to mention.
     * @example```ts
     * mention('928616268376965120') // <@928616268376965120>
     * ```
     */
    public mention(userId: Snowflake) {
        return `<@${userId}>`;
    }

    /**
     *
     * Mention a role with ease.
     * @param roleId The ID of the role to mention.
     * @example```ts
     * mentionRole('928616268376965120') // <@&928616268376965120>
     * ```
     */
    public mentionRole(roleId: Snowflake) {
        return `<@&${roleId}>`;
    }

    /**
     * Formats the given timestamp into a discord timestamp thing.
     *
     * @param seconds The time to format, represents an UNIX timestamp in seconds
     * @param type The type of style to use
     * @example```ts
     * formatDate(81237128737123812, 'R')
     * ```
     */
    public formatDate(time: number, type: string) {
        return `<t:${Math.floor(time) / 1000}:${type}>`;
    }

    /**
     *
     * @param member The member to check.
     * @param roleId The Id of the role.
     * @example```ts
     * hasRole(message.member, '928616268376965120') // returns true
     * ```
     */
    public hasRole(member: GuildMember, roleId: Snowflake) {
        return member.roles.cache.has(roleId);
    }

    /**
     *
     * Find a channel in a guild with ease.
     * @param ch The Name or ID of the channel.
     * @param guild The guild to check.
     * @example```ts
     * findChannel('general', message.guild)
     * ```
     */
    public findChannel(ch: string, guild: Guild) {
        const channel = guild.channels.cache.find(
            (c) => c.name == ch || c.id === ch
        ) as TextChannel;
        if (channel) return channel;
        else return null;
    }

    /**
     *
     * Delete a message with ease.
     * @param message The message to delete.
     * @param timeout After how long to delete the message. (In milliseconds)
     * @example```ts
     * deleteMsg(message, 2000) // Deletes the message after 2 seconds.
     * ```
     */
    public deleteMsg(message: Message, timeout?: number) {
        if (timeout) {
            setTimeout(() => {
                message.delete().catch(() => {});
            }, timeout);
        } else {
            message.delete();
        }
    }

    /**
     *
     * The ms package for typescript users.
     * @param value The value to convert
     * @example```ts
     * ms('1m') // 60000
     * ```
     */
    public ms(value: any) {
        return MS(value as StringValue);
    }
}
